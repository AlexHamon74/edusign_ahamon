<?php

namespace App\Controller;

use App\Entity\Eleve;
use Doctrine\ORM\EntityManagerInterface;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\PngWriter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class QrCodeController extends AbstractController {
    public function __invoke($id, EntityManagerInterface $em): Response
    {
        $eleve = $em->getRepository(Eleve::class)->find($id);

        if (!$eleve) {
            return new Response('Élève non trouvé', 404);
        }

        // Pour tester sur téléphone
        //-----------------------------------------------------------
        // $ip = '10.26.131.145';
        // $port = 8000;
        // $url = "http://$ip:$port/api/eleves/{$eleve->getId()}/sign";
        // ----------------------------------------------------------

        $url = $this->generateUrl('api_eleve_qrcode', ['id' => $eleve->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

        $builder = new Builder(
            writer: new PngWriter(),
            data: $url,
            size: 300,
            margin: 10
        );
        
        $qrCode = $builder->build();

        return new Response($qrCode->getString(), 200, [
            'Content-Type' => $qrCode->getMimeType()
        ]);
    }
}
